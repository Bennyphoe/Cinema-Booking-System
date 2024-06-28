import { BreadCrumb } from "../../../components/BreadCrumb"

export const getBreadCrumbs: BreadCrumb[] = [
  {
    href: "/showtime",
    current: false,
    value: "Showtimes"
  },
  {
    href: "/",
    current: true,
     value: "Seat Selection"
  }
]