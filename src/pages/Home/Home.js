import calendarClock from "../../assets/calendar-clock.svg";
import calendar from "../../assets/calendar.svg";
import person from "../../assets/person.svg";
import styles from "./Home.module.css";
import MenuItem from "./MenuItem";

export default function Home() {
  return (
    <div className={styles.menu}>
      <MenuItem endpoint="/horarios" title="Agendar Horário" icon={calendar} />
      <MenuItem endpoint="/minha-agenda" title="Minha Agenda" icon={calendarClock} />
      <MenuItem endpoint="/minha-conta" title="Minha Conta" icon={person} />
    </div>
  );
}
