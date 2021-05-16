import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ color, title, onAdd, showTaskAddForm }) => {

  return (
    <header className='header'>
      <h1>{title}</h1>
      <Button
        text={showTaskAddForm ? 'Close' : 'Add'}
        color={showTaskAddForm ? 'red' : 'green'}
        onClick={onAdd}
      />
    </header>
  )
}

Header.defaultProps = {
  title: 'Task Tracker'
}


Header.propTypes = {
  title: PropTypes.string
}

export default Header
