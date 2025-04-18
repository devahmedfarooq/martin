import User from "../../../db/models/user.model.js"
import Stripe from 'stripe'


const testApiKey = "sk_test_51QxbgKFT33qSsNWNG2wcToWHuDsJyiwjM4UOgiAkoQCDANICRRRgDz0cVfyrVOmksJXx3Z7LfyKb4VdenGUEuCOb00gd1SfMuT"

const stripe = new Stripe(testApiKey)



const packages = {
    "english": [
        {
            "id": 1,
            "price": {
                'month': 29,
                'annual': 19
            },
            "title": "Beginner Plan",
            "description": "5 Textual Products & 0 Visual Products. Features Allowed: Product Description, Marketing Angles, FAQ, and Customer Reviews.",
            "features": [
                "Product Description",
                "Marketing Angles",
                "FAQ",
                "Customer Reviews",
            ],
            "text" : 5,
            "image" : 0
        },
        {
            "id": 2,
            "price": {
                'month': 39,
                'annual': 24
            },
            "title": "Advanced Plan",
            "description": "15 Textual Products & 5 Visual Products. Includes all Beginner Plan features and more.",
            "features": [
                "Product Description",
                "Marketing Angles",
                "Customer Reviews",
                "FAQ",
                "Influencer Briefs",
                "Custom Images"
            ],
            "text" : 15,
            "image" : 5
        },
        {
            "id": 3,
            "price": {
                'month': 69,
                'annual': 39
            },
            "title": "Pro Plan",
            "description": "20 Textual Products & 10 Visual Products. The best plan for businesses.",
            "features": [
                "Product Description",
                "Marketing Angles",
                "Customer Reviews",
                "FAQ",
                "Influencer Briefs",
                "Customer Support Writing",
                "Email Marketing",
                "Successful Rate",
                "Custom Images"
            ],
            "text" : 20,
            "image" : 10
        }
    ],
    "french": [
        {
            "id": 1,
            "price": {
                'month': 29,
                'annual': 19
            },
            "title": "Débutant",
            "description": "5 Produits Textuels & 0 Produits Visuels. Fonctionnalités incluses : Description Produit, Angles Marketing, FAQ et Avis Clients.",
            "features": [
                "Description Produit",
                "Angles Marketing",
                "FAQ",
                "Avis Clients",
            ],
            "text" : 5,
            "image" : 0
        },
        {
            "id": 2,
            "price": {
                'month': 39,
                'annual': 24
            },
            "title": "Avancé",
            "description": "15 Produits Textuels & 5 Produits Visuels. Inclut toutes les fonctionnalités du plan Débutant et plus.",
            "features": [
                "Description Produit",
                "Angles Marketing",
                "Avis Clients",
                "FAQ",
                "Briefs Influenceurs",
                "Images sur-mesure",
            ],
            "text" : 15,
            "image" : 5
        },
        {
            "id": 3,
            "price": {
                'month': 69,
                'annual': 39
            },
            "title": "Pro",
            "description": "20 Produits Textuels & 10 Produits Visuels. Le meilleur plan pour les entreprises.",
            "features": [
                "Description Produit",
                "Angles Marketing",
                "Avis Clients",
                "FAQ",
                "Briefs Influenceurs",
                "Rédaction SAV",
                "Email Marketing",
                "Taux de Succès",
                "Images sur-mesure"
            ],
            "text" : 20,
            "image" : 10
        }
    ]
}





const handlePayment = async (req, res) => {
    try {
        const { id } = req.user;
        const { packageId, lang, annual } = req.body;

        // Find user
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Retrieve or create Stripe customer
        let customerId = user.stripeId;
        if (!customerId) {
            const customer = await stripe.customers.create({
                name: user.username,
                email: user.email,
            });

            const updatedUser = await User.findByIdAndUpdate(id, {
                $set: { stripeId: customer.id }
            }, { new: true });

            customerId = updatedUser.stripeId;
        }

        // Select package language
        const pkgs = packages[lang] || packages.english; // Default to English if language is invalid
        const selectedPackage = pkgs.find(pkg => pkg.id === packageId);

        // Validate package selection
        if (!selectedPackage) {
            return res.status(400).json({ message: "Invalid package selected" });
        }

        // Combine description and features
        const fullDescription = `${selectedPackage.description}\nFeatures: ${selectedPackage.features.join(", ")}`;

        // Create Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "subscription",
            line_items: [
                {
                    price_data: {
                        currency: "eur",
                        product_data: {
                            name: selectedPackage.title,
                            description: fullDescription,
                            metadata: {
                                packageId: selectedPackage.id,
                                title: selectedPackage.title,
                                description: selectedPackage.description,
                                features: JSON.stringify(selectedPackage.features),
                            }
                        },
                        unit_amount: selectedPackage.price[annual ? "annual" : "month"] * 100,
                        recurring: {
                            interval: "month",
                            interval_count: annual ? 12 : 1
                        }
                    },
                    quantity: 1,
                },
            ],
            customer: customerId,
            client_reference_id: String(id), // Ensure it's a valid string
            success_url: `http://localhost:5173/?payment=success`,
            cancel_url: `http://localhost:5173/?payment=cancel`,
        });

        return res.status(200).json({
            payment_url: session.url,
            message: "Payment Link Sent Successfully"
        });

    } catch (error) {
        console.error("Error in handling Payment:", error);
        return res.status(500).json({ message: 'Some Error Handling Payment' });
    }
};


const webhook = async (req, res) => {
    const event = req.body;

    try {
        // Construct the event using Stripe's secret
        //const event = stripe.webhooks.constructEvent(req.body, String (sig), "whsec_YW23FMXSNmEeRrvPX5h05Q6fbRvyas78");

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            console.log("✅ Payment received!", session);

            // Extract necessary data
            const customerEmail = session.customer_details.email;
            const customerId = session.client_reference_id
            const packageAmount = session.amount_total / 100; // Convert cents to euros

            console.log(`📩 Email: ${customerEmail}, Package Paid: €${packageAmount}`);

            // 💾 Store in database (MongoDB/PostgreSQL example)

            function getSubscriptionId(amountTotal) {
                for (const lang in packages) {
                    for (const pkg of packages[lang]) {
                        if (Object.values(pkg.price).some(price => price === amountTotal)) {
                            return [pkg.text,pkg.image, pkg.title];
                        }
                    }
                }
                return null; // Return null if no match is found
            }

            const [totalProduct,totalRegenerations, subscription] = getSubscriptionId(packageAmount)


            const updatedUser = await User.findByIdAndUpdate(customerId, {
                $set: {
                    subscription: subscription,
                    totalRegenerations: totalRegenerations,
                    totalProduct: totalProduct,
                    regenerations : 0,
                    product : 0
                }
            })





            // await Payment.create({ email: customerEmail, package: `€${packageAmount}` });

            // 📧 Send confirmation email if needed
        }

        res.json({ received: true });
    } catch (err) {
        console.error("❌ Webhook Error:", err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
}


export {
    handlePayment,
    webhook
}