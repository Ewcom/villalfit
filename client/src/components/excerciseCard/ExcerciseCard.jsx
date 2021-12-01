// import { excercisesNames } from './excerciseNames' //TODO
import './excerciseCard.scss'

export const ExcerciseCard = (props) => {

    
    
    //! OLD IMPLEMENTATION FETCHING EXCERCISES ONE BY ONE
    //const [isLoading, setLoading] = useState(false)
    // const fetchExcercise = async () => {
    //     const excerciseData = await axios.get(`http://localhost:8080/api/excercise/${props.excerciseId}`)
    //     setExcercise(excerciseData.data)
    //     setLoading(false)
    // }
    // useEffect(() => {
    //     fetchExcercise()
    //     // eslint-disable-next-line
    // }, []);





    return (

        <div className="excerciseCard">

            <span className="card_image">
                <img src={props.excerciseInfo.picture} alt="" />
            </span>

            <div className="container1">

                    <span className="card_name">{props.excerciseInfo.name}</span>

                    <span className="card_weight" > {props.excerciseInfo.weight} <span className="weightLetters">KG </span> </span>

            </div>
            <div className="container2">

                <div className="card_repetitions_container">
                    
                    <span className="x" >x</span>    <span className="card_repetitions_item"> {props.excerciseInfo.repetitions.map((repetition, index) => (<span key={index}> {repetition}  </span>))}  </span>
                </div>

            </div>

        </div>
    )
}
