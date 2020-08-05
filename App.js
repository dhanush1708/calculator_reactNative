/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	Text,
	StatusBar,
	Image,
	Button,
	TextInput,
	TouchableOpacity
} from 'react-native';

import {
	Header,
	LearnMoreLinks,
	Colors,
	DebugInstructions,
	ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default class count extends Component {
	constructor() {
		super()
		this.state = {
			resultText: "",
			calculationText: "",
		};
		this.ops = ['clr', 'del', '/', '*', '-', '+'];

	}
	calculateResult() {
		const text = this.state.resultText;
		this.setState({ resultText: eval(this.state.resultText), calculationText: "" })
	}

	buttonPressed(text) {
		// console.log(text)

		if (text == "=") {
			return this.calculateResult();
		}


		this.setState({
			resultText: this.state.resultText + text,
		})
		this.setState({
			calculationText: eval(this.state.resultText + text)
		})
	}

	operate(operation) {


		switch (operation) {
			case 'del':
				let text = this.state.resultText.slice(0, -1);
				this.setState({ resultText: text, calculationText: "" })
				break;
			case 'clr':
				this.setState({ resultText: "", calculationText: "" })
				break
			case '+':
			case '-':
			case '*':
			case '/':
				let lastChar = this.state.resultText.split('').pop()
				if (this.ops.indexOf(lastChar) > 1) return
				if (this.state.resultText == "") return //we can't have blank operations

				this.setState({ resultText: this.state.resultText + operation })


		}
	}
	render() {
		console.log(this.state.resultText)

		let nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [".", 0, "="]];
		let rows = []
		for (let i = 0; i < 4; i++) {
			let row = [];
			for (let j = 0; j < 3; j++) {
				row.push(
					<TouchableOpacity style={styles.btn} onPress={() => this.buttonPressed(nums[i][j])}>
						<Text style={styles.btntext}>{nums[i][j]}
						</Text>
					</TouchableOpacity>);
			}
			rows.push(<View style={styles.row}>{row}</View>);
		}

		//operations

		let operations = [];
		for (let i = 0; i < this.ops.length; i++) {
			operations.push(<TouchableOpacity style={styles.btn} onPress={() => this.operate(this.ops[i])}><Text style={styles.btntext}>{this.ops[i]}</Text></TouchableOpacity>)
		}


		return (
			<View style={styles.container}>
				<View style={styles.result}>
					<Text style={styles.restxt}>{this.state.resultText}</Text>
				</View>
				<View style={styles.calculation}>
					<Text style={styles.calctxt}>{this.state.calculationText}</Text>
				</View>
				<View style={styles.button}>
					<View style={styles.numbers}>
						{rows}
					</View>
					<View style={styles.operations}>
						{operations}
					</View>
				</View>
			</View>

		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	result: {
		flex: 2,
		backgroundColor: "white",
		alignItems: "flex-end",
		justifyContent: "center"
	},
	restxt: {
		fontSize: 30,
	},
	calculation: {
		flex: 1,
		backgroundColor: "rgb(200,200,200)",
		alignItems: "flex-end",
		justifyContent: "center"
	},
	calctxt: {
		fontSize: 25,
	},
	button:
	{
		flex: 7,
		backgroundColor: "rgb(70,70,70)",
		flexDirection: "row",
	},
	numbers: {
		flex: 8,
		backgroundColor: "rgb(100,100,100)"
	},

	row: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",

	},
	operations: {
		flex: 2,
		justifyContent: "space-around",
		alignItems: "center",
	},
	btntext: {
		fontSize: 30,
		color: "white"
	},
	btn: {
		flex: 1,
		alignItems: 'center',
		alignSelf: "stretch",
		justifyContent: "center",
	}

})