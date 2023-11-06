const Image = (props) => {
    return (
        <div>
            <img
                className="w-screen"
                style={{ height: '500' }}
                src={props.imgUrl}
            />
        </div>
    )
}

export default Image
