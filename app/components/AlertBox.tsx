export default function AlertBox() {
    return (
        <div className="flex px-4 py-2 bg-red-500 rounded-md">
            <div>
                <p className="text-base font-semibold">Error occured</p>
                <p className="text-sm">Invalid account</p>
            </div>
        </div>
    )
}