import './index.css'
import { useNavigate } from 'react-router-dom'


interface Props {
  firstName: string,
  lastName: string,
  disabled?: boolean
}

const AccountButton: React.FC<Props> = ({firstName, lastName, disabled}) => {

  const navigateAccount = useNavigate();

  return (
    <button 
      className={`account-button ${disabled ? "account-disabled" : "account-allowed"}`}
      onClick={() => navigateAccount('/account')}
      disabled={disabled ? true : false}
    >
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