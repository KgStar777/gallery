export function SubmitButton(props: {
  children: string,
}) {
  return (
    <button className="submit-button" type="submit">{props.children}</button>
  )
}