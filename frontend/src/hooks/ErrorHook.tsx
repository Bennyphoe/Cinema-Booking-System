import { ReactElement, useState } from "react"


export const useErrorHook = () => {
  const [errors, setErrors] = useState<string[]>([])

  const displayErrors = (): ReactElement => {
    return (
      <>
        {errors.length > 0 
        && 
        <ul>
          {errors.map(error => <li className="text-danger">{error}</li>)}
        </ul>}
      </>
    )
  }

  return {
    errors,
    setErrors,
    displayErrors
  }
}