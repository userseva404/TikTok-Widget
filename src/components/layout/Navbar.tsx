const navbar = [
  {
    name: "Home",
    Icon: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        {...props}
      >
        <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
      </svg>
    ),
  },
  {
    name: "Friends",
    Icon: (props) => (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
      >
        <path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM247-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47Zm466 0q-47 47-113 47-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113q0 66-47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q440-607 440-640t-23.5-56.5Q393-720 360-720t-56.5 23.5Q280-673 280-640t23.5 56.5Q327-560 360-560t56.5-23.5ZM360-240Zm0-400Z" />
      </svg>
    ),
  },
  {
    type: "special",
    name: "",
    Icon: () => <SpecialIcon style={{ width: "90px" }} />,
  },
  {
    name: "Inbox",
    Icon: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        viewBox="0 -960 960 960"
      >
        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-120H640q-30 38-71.5 59T480-240q-47 0-88.5-21T320-320H200v120Zm349-142q31-22 43-58h168v-360H200v360h168q12 36 43 58t69 22q38 0 69-22ZM200-200h560-560Z" />
      </svg>
    ),
  },
  {
    name: "Profile",
    Icon: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        viewBox="0 -960 960 960"
      >
        <path d="M367-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
      </svg>
    ),
  },
];

export function Navbar() {
  return (
    <div className="navbar">
      {navbar.map(({ name, Icon, type }) => {
        return (
          <div key={name} data-active={name === "Profile" ? "active" : ""}>
            <Icon className={type !== "special" && "icon"} />
            {name && <span>{name}</span>}
          </div>
        );
      })}
    </div>
  );
}

function SpecialIcon({ className = "", ...props }) {
  return (
    <div id="add-btn" className={`${className}`} {...props}>
      <div className="bg"></div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
      </svg>
    </div>
  );
}
