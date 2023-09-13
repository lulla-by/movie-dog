import Button from "@/components/buttons/Button";

export default function Home() {
  return (
    <>
      <h1>Movie Dog Main Page</h1>
      <Button width="400" disabled/>
      <Button width="500" active/>
      <Button width="500" />
      <Button  icon="Google" width="300"/>
      <Button  icon="Github" width="300"/>
    </>
  )
}