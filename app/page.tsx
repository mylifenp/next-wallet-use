import Connect from '@/components/Connect'
import styles from './page.module.css'
import GetValue from "@/components/GetValue";

export default function Home() {
  return (
    <main className={styles['main']}>
      <Connect/>
      <GetValue/>
    </main>
  )
}