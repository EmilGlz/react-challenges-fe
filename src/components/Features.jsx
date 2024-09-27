const features =[
    {
        title: "Lorem Ipsum",
        description: "Lorem ipsum dolor sit amet",
        image: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
      </svg>
      
    },
]

const Features = () => {
    return (
    <div className="bg-white">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <h3 className="text-xl font-bold">Incentives</h3>
            {
                features.map((index, item) => {
                    return (
                    <div key={index}>
                        {item.image}
                        <p>{item.title}</p>
                    </div>)
                })
            }
        </div>
    </div>)
}

export default Features