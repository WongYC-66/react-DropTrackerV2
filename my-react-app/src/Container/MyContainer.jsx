function MyContainer({content}) {
    return (
        <div className='bg-light p-1 border border-maple-border-2 border-opacity-50 rounded-3' >
            <div className='m-0 bg-maple-bg-1 border border-2 border-maple-border-1 rounded-2'>
                { content }
            </div>
        </div >
    )
}

export default MyContainer