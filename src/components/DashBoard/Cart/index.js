import { useSelector } from "react-redux"
import {RenderCartCourses} from './RenderCartCourses'
import { RenderTotalAmount } from "./RenderTotalAmount";




export default function Cart(){
    const {total,totalItems} = useSelector((state) => state.cart);
    return (
        <>
            <h1 className="text-3xl text-richblack-5 font-medium mb-14">
                My Whishlist
            </h1>
            <p className="text-richblack-400 border-b border-b-richblack-500 pb-2 font-semibold">
                {totalItems} Courses in whishlist
            </p>
            {
                total > 0 ? (
                    <div className="flex gap-x-10 gap-y-6 flex-col lg:flex-row items-start mt-8">
                        <RenderCartCourses/>
                        <RenderTotalAmount/>
                    </div>
                ):(
                    <p className="mt-14 text-center text-3xl text-richblack-100">
                        Your cart is empty
                     </p>
                )
            }
        </>
    )
}