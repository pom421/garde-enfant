import { Footer } from "@/components/Footer"
import Holiday from "@/components/Holiday"
import { Container } from "@chakra-ui/react"
import Head from "next/head"
import styles from "../styles/Home.module.css"

export default function HolidaysPage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Congés</h1>

        <Container maxW="xl" centerContent>
          <Holiday />
        </Container>
      </main>

      <Footer />
    </div>
  )
}
