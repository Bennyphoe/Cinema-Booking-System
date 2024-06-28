import { BreadCrumb } from "../../../components/BreadCrumb"

export const getBreadCrumbs: BreadCrumb[] = [
  {
    href: "/",
    current: false,
    value: "Home"
  },
  {
    href: "#",
    current: true,
     value: "Showtimes"
  }
]