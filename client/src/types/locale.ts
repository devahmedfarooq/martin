type Locale = {
    app: App,
    settings: Setting,
    addproductwidget: AddProductWidget,
    list: List,
    product: Product,
    layout: Layout,
    image: Image,
    actionButton: ActionButton
}

interface Product {
    coa: string
}


interface List {
    noProducts: string,
    seemore: string
}

type App = {
    title: String,
    description: string,
    marketing_angle: string,
    product_title: string,
    faqs: string,
    reviews: string,
    after_sale: string,
    successfull_rate: string,
    influencer_breif: string,
    email_marketing: string,
    regenrate: string,
    logout: string,
    images: string
}
type Setting = {
    title: String,
    username: String,
    email: String,
    password: String,
    save: String,
    usernamePlaceholder: string,
    emailPlaceholder: string,
    passwordPlaceholder: string,
}

type AddProductWidget = {
    title: String,
    coa: string,
    products: string,
    generation: string,
    popup: GenrateDialogPopUp,
    select: string
}


interface GenrateDialogPopUp {
    title: string,
    name: string,
    description: string,
    amazonPage: string,
    language: string,
    generate: string
}

interface Layout {
    en: string,
    fr: string,
    language: string
}

interface Image {
    select: string,
    coa: string,
    generation: string,
    generate: string
}


interface ActionButton {
    download: string,
    reset: string,
    copy: string
}

export default Locale