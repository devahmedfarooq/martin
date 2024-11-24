import { z } from "zod"
 
const formSchema = z.object({
  email: z.string().min(2).max(50).email("Please enter correct email."),
  password:z.string().min(8,{message:"Password must be 8 or more chracter"})
})

export default formSchema