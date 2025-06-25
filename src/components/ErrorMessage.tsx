import { ReactNode } from "react"

type ErrorMessageProps = {
    children : ReactNode
}

//Este enfoque nos permite renderizar diferentes tipos de mensaje 
export default function ErrorMessage({children}: ErrorMessageProps) {
  return (
    <p className='bg-red-600 p-2 text-white text-sm text-center font-bold'>
        {children}
    </p>
  )
}
