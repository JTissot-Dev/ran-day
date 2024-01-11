import './index.css'


interface Props {
  firstName: string,
  lastName: string,
}

const AccountButton: React.FC<Props> = ({firstName, lastName}) => {
  return (
    <button className="account-button">
        <span>
          {
            firstName.charAt(0).toUpperCase() + 
            lastName.charAt(0).toUpperCase()
          }
        </span>
    </button>
  )
}

export default AccountButton