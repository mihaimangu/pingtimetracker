import Image from "next/image";
import styles from "./page.module.css";
import { Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <Link href="/dashboard">
        <Typography>Go to dashboard</Typography>
      </Link>


    
   
    </main>
  );
}
