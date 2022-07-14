import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const VisibilityFilter = (props) => {
  const dispatch = useDispatch()

  return (
    <div>
      all
      <input
        id='radio-all'
        type="radio" 
        name="filter" 
        // checked
        onChange={() => dispatch(filterChange('ALL'))}
      /> &nbsp;
      important
      <input
        id='radio-important'
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange('IMPORTANT'))}
      /> &nbsp;
      non-important
      <input
        id='radio-non-important'
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange('NON-IMPORTANT'))}
      />
    </div>
  )
}

export default VisibilityFilter
