import { useState } from 'react';
import Note from './Note';

const AddNote = ({ handleAddNote, tweetsFirsToProps, userName, userNameNew }) => {
    const [noteText, setNoteText] = useState('');
    const [hideButton, setHideButton] = useState(0);
    const characterLimit = 140;

    const handleChange = (event) => {
        if (characterLimit - event.target.value.length >= 0) {
            setNoteText(event.target.value);
            const countForButton = characterLimit - event.target.value.length;
            setHideButton(countForButton);
        }
    };

    const handleSaveClick = () => {
        if (noteText.trim().length > 0) {
            handleAddNote(noteText);
        };
        setNoteText('');
    };

    return (
        <div>
            <div className="writecontainer">
                <div className="newTweet">
                    <div className="note new">
                        <textarea rows='8' cols='10'
                            placeholder="What you have in mind..."
                            value={noteText}
                            onChange={handleChange}
                        ></textarea>
                        <div className="note-footer">
                            {hideButton < 10 ? (
                                <div className='remindMe'>
                                    <small>The tweet can't contain more then 140 chars, remained: {characterLimit - noteText.length}</small>
                                </div>
                            ) : (<div className='remindMe'>
                                <small></small>
                            </div>
                            )}

                            {hideButton === 0 ? (

                                <span> <button background="white"
                                >Tweet</button></span>
                            ) : (
                                <span><button className='save' onClick={handleSaveClick}
                                >Tweet</button> </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="notes-list">
                    {tweetsFirsToProps.map((tweet) =>
                    (<Note id={tweet.id} userName={tweet.userName} content={tweet.content} date={tweet.date} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AddNote;