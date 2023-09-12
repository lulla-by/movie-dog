import Footer from '@/components/Footer'
import { Header } from '@/components/Header'
export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
