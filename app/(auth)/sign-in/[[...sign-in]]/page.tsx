import { SignIn } from "@clerk/nextjs"

const Signin = () => {
  console.log(process.env.NODE_ENV)
  return (<SignIn/>
  
  )

}

export default Signin