export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return(
        <div className="flex justify-center p-5">
            {children}
        </div>
    )
}