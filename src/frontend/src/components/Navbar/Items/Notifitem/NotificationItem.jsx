import { forwardRef } from "react";

import "./NotificationItem.css";

const NotificationItem = forwardRef(
  ({ type, color, image, source, title, date, ...rest }, ref) => (
    <div {...rest} ref={ref} class={color}>
      <li class="notification-list-item">
        <p class="messagenotifitem">{title}</p>
        <span class="from">
          <a href="#top">{source} </a>
        </span>
        <span class="date">{date}</span>
      </li>
    </div>
  )
);

export default NotificationItem;
