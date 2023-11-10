import classNames from "classnames"

const className = "font-bold"

const variants = {
  primary: "bg-blue-400 rounded shadow hover:scale-105",
  secondary: "hover:scale-105",
  btnValidation: "bg-yellow-400 rounded shadow hover:scale-105",
  btnDelete: "bg-red-500 rounded shadow hover:scale-105",
}

const sizes = {
  sm: "py-1 px-1.5",
  md: "py-1.5 px-3",
  lg: "py-3 px-6",
  xl: "py-5 px-7",
}

const bgColor = {
  normal: "bg-zinc-100",
  bad: "bg-red-500",
  good: "bg-green-500",
}

const Button = (props) => {
  const { variant, size, color, ...otherProps } = props

  return (
    <button
      {...otherProps}
      className={classNames(
        className,
        variants[variant],
        sizes[size],
        bgColor[color]
      )}
    />
  )
}

export default Button
