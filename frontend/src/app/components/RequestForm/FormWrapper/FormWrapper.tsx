import { ReactNode } from "react"


export function FormWrapper(props: {
  header: string,
  isMobile: boolean,
  children: ReactNode,
  submitButton: ReactNode,
  childrenAsDefault?: boolean,
  onSubmit: (data: any) => any,
  orientation?: "vertical"
}) {
  return (
    <section className="subscription-form-section">
      <h3>{props.header}</h3>
      <form className={
        props.orientation
          ? "subscription-form__mobile"
          : "subscription-form"
        }
        onSubmit={props.onSubmit}>
        {props.isMobile
          ? (
          <div className="subscription-form__fields">
            {props.children}
          </div>
          )
          : (
            <>
              {props.children}
            </>
          )
        }
        {props.submitButton}     
      </form>
    </section>
  )
}