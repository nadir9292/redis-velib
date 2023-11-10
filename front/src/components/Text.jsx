import classNames from "classnames"

const className = "font-bold"

const variants = {
  general: "",
  title: "",
  login_register: "",
  nav_bar: "",
  popup: "",
  info: "",
  link: "",
}

const sizes = {
  sm: "text-xs",
  md: "text-md",
  lg: "text-lg",
  xl: "text-3xl",
  xxl: "text-5xl",
}

const Text = (props) => {
  const { variant, size, ...otherProps } = props

  return (
    <h1
      {...otherProps}
      className={classNames(className, variants[variant], sizes[size])}
    />
  )
}

export default Text
