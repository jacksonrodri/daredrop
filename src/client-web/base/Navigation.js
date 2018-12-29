import React, { memo } from 'react'

import classNames from 'classnames'

import {
	navigationColor,
} from 'sls-aws/src/client-web/commonStyles'

import navigationConnector from 'sls-aws/src/client-logic/app/connectors/navigationConnector'

import MaxWidthContainer from 'sls-aws/src/client-web/base/MaxWidthContainer'
import NavigationDesktop from 'sls-aws/src/client-web/base/NavigationDesktop'
import NavigationMobile from 'sls-aws/src/client-web/base/NavigationMobile'

const styles = {
	root: {
		color: 'white',
		backgroundColor: navigationColor,
		height: 75,
	},
	logo: {
		fontSize: 25,
		fontFamily: 'Impact',
	},
}

export const NavigationUnconnected = memo(({
	showMobileNav, classes,
}) => (
	<div
		className={classNames(
			'layout-row layout-align-center-stretch',
			classes.root,
		)}
	>
		<MaxWidthContainer>
			<div
				className={classNames(
					'layout-column layout-align-center',
					classes.logo,
				)}
			>
				DoubleDog.tv
			</div>
			<NavigationDesktop />
		</MaxWidthContainer>
	</div>
))

export default navigationConnector(NavigationUnconnected, styles)
