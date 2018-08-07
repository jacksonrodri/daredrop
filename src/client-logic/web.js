import createStore from 'sls-aws/src/util/createStore'

import initApp from 'sls-aws/src/client-logic/app/thunks/initApp'

// reducers
import changeRoute from 'sls-aws/src/client-logic/route/reducers/changeRoute'
import changeInput from 'sls-aws/src/client-logic/form/reducers/changeInput'

// listeners
import popStateListener from 'sls-aws/src/client-logic/route/listeners/popStateListener'

const store = createStore(
	{
		...changeRoute,
		...changeInput,
	}, // reducer object
	// [], // sagas
	[
		popStateListener,
	], // listeners
	{}, // initial state
	initApp
)

export default store
