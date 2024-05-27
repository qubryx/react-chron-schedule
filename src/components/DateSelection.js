import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import css from './DateSelection.module.css';
import { END_TYPES } from '../utils/constants';

function DateSelection(props) {
	const {disabled = false, styles = {}, value = {}, setValue, state = {}, setState} = props;
	const {selectedEndType, startDate, endDate, endCount} = state;

	const handleEndTypeChange = event => {
		setValue({selectedEndType: event?.target?.value});
	};
	const handleStartDateChange = val => {
		setValue({startDate: val});
	};
	const handleEndDateChange = val => {
		setValue({endDate: val});
	};
	const handleEndCountChange = event => {
		setValue({endCount: event?.target?.value});
	};

	return (
		<div className={css.mainContainer} style={styles.dateContainer}>
			<div className={css.startContainer}>
				<label style={styles.startLabel} className={css.startLabel}>
					Start
				</label>
				<DatePicker
					disabled={disabled}
					className={css.startDate}
					selected={startDate}
					onChange={handleStartDateChange}
				/>
			</div>
			<div className={css.endContainer}>
				<label style={styles.endLabel}>End</label>
				<select
					key="endType"
					disabled={disabled}
					value={selectedEndType}
					className={css.endType}
					style={styles.endType}
					onChange={handleEndTypeChange}
				>
					<option key="NoEnd" value={END_TYPES.NO_END}>
						no end date
					</option>
					<option key="Date" value={END_TYPES.DATE}>
						on this day
					</option>
					<option key="Count" value={END_TYPES.COUNT}>
						after
					</option>
				</select>
				{selectedEndType === END_TYPES.DATE ? (
					<DatePicker
						disabled={disabled}
						className={css.startDate}
						selected={endDate}
						onChange={handleEndDateChange}
					/>
				) : selectedEndType === END_TYPES.COUNT ? (
					<>
						<input
							disabled={disabled}
							value={endCount}
							onChange={handleEndCountChange}
							className={css.endCount}
							style={styles.endCount}
							type="number"
							min={1}
						/>
						<label style={{marginLeft: 10}}>occurance</label>
					</>
				) : null}
			</div>
		</div>
	);
}

export default DateSelection;
