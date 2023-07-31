import './MailList.css'

function MailList() {
  return (
    <div className="mail">
        <h1 className="mailTitle">Save time and money</h1>
        <span className="mailDesc">Sign up ad we'll send best deals</span>
        <input type="text" placeholder='Tour Email'/>
        <button>Subscribe</button>
    </div>
  )
}

export default MailList