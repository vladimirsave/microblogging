const Note = ({ tweetsFirsToProps, date, userName, id, content }) => {


    return (
        <div className='note'>
            <div className='title-tweet' key={id}>
                <span>{userName}</span>
                <small>{date}</small>
            </div>

            <span>{content}</span>
            <div className="note-footer">
            </div>
        </div>
    )

};

export default Note;



