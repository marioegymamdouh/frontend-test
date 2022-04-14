import styles from './IntSelector.module.css';

interface IIntSelector {
  label: string,
  value: number,
  changeHandler: (newValue: number) => void
}

const IntSelector = ({
  label,
  value,
  changeHandler
}: IIntSelector) => {
  return (
    <label className={styles.intSelector}>
      {label}
      <input
        type='number'
        value={value}
        onChange={e => changeHandler(parseInt(e.target.value))} step={1}
        onKeyDown={ (evt) => (evt.key === 'e' || evt.key === '.') && evt.preventDefault() }
      />
    </label>
  )
};

export default IntSelector;