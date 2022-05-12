import { React } from "react"; 

export function Notification(props) {
    // show notification container if showNotification is true
    return (
        <div className={`notification-container ${props.showNotification ? 'show' : ''}`}>
            <p>You have already entered this letter</p>
        </div>
    )
}