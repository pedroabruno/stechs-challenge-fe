import {Image} from "@nextui-org/react";
import CablePic from "src/resources/images/CablePic1.png";
export default async function Page(){
    return(
        <div className="z-10 w-full max-w-5xl items-center font-mono text-sm text-white pt-6 m-auto">
                <div className="m-3 align-middle flex justify-center text-3xl">About us</div>
                <></>
                <div className="flex justify-center">
                    <Image isBlurred={true} src={CablePic.src} alt="Company Pic" width='400px' />
                </div>
                <div className="max-w-md m-auto">
                    Welcome to Cable-Modem, your premier destination for top-quality communication components. At Cable-Modem, we're passionate about connectivity and dedicated to providing cutting-edge solutions that empower businesses and individuals alike.

                    With a commitment to excellence and innovation, we specialize in offering a comprehensive range of communication components, including routers, hubs, switches, and more. Whether you're looking to enhance your network infrastructure, streamline your data management processes, or optimize your connectivity solutions, we have the expertise and products to meet your needs.

                    What sets Cable-Modem apart is our relentless focus on customer satisfaction. We understand that every business has unique requirements, which is why we take the time to listen to your specific needs and tailor our solutions accordingly. Our team of experienced professionals is always on hand to provide personalized support and guidance, ensuring that you get the most out of your investment.

                    At Cable-Modem, we believe that communication is the cornerstone of success in today's digital age. That's why we're committed to empowering our clients with reliable, efficient, and scalable communication solutions that drive growth, productivity, and innovation.

                    Thank you for choosing Cable-Modem as your trusted partner in communication components. We look forward to helping you build a brighter, more connected future.
                </div>
        </div>
  )
}