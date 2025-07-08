import "./Loader.scss";

export function Loader() {
return (
    <div className="m-0 p-0 h-100 w-full bg-gradient-to-b from-white via-pink-100 to-white flex items-center justify-center dark:bg-gradient-to-b dark:from-[#292929] via-pink-100 dark:to-[#292929]">
        {/* <img src="" /> */}
        <div className="mt-8 mb-8 flex items-center justify-center">
            <div className="text-before-dots">Loading</div>
            <div className="loader">
                <span className="text-lg dots-24"></span>
            </div>
        </div>
    </div>
)}
