import { FC } from "react";
import './styles.css'

export type BreadCrumb = {
  href: string;
  value: string;
  current: boolean
}

type BreadCrumbProps = {
  breadCrumbs: BreadCrumb[]
}

const BreadCrumb:FC<BreadCrumbProps> = ({breadCrumbs}) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {breadCrumbs.map(breadCrumb => {
          return (
            <li key={breadCrumb.value} className="breadcrumb-item">
              {!breadCrumb.current && <a href={breadCrumb.href} className={`breadcrumb-item`} >{breadCrumb.value}</a>}
              {breadCrumb.current && breadCrumb.value}
            </li>
          )
        })}
      </ol>
    </nav>
    
  )
}

export default BreadCrumb