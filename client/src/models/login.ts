/* import { z } from "zod"
 
const formSchema = z.object({
  email: z.string().email("Please enter correct email."),
  password:z.string().min(8,{message:"Password must be 8 or more chracter"})
})

export default formSchema */


interface Inputs {
  password: string,
  email: string
}

export default Inputs