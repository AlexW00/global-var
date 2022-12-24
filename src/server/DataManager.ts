import * as fs from "fs";

const JSON_FILEPATH = "src/server/data.json";

function _jsonDoesExist() {
	return fs.existsSync(JSON_FILEPATH);
}

function _initJson() {
	if (!_jsonDoesExist()) fs.writeFileSync(JSON_FILEPATH, "{}");
}

function _getJson() {
	if (_jsonDoesExist())
		return JSON.parse(fs.readFileSync(JSON_FILEPATH).toString());
	else {
		_initJson();
		return {};
	}
}

function _setJson(obj: any) {
	fs.writeFileSync(JSON_FILEPATH, JSON.stringify(obj, null, 4));
}

function _getValue(key: string, obj: Record<string, any>) {
	const keys = key.split(".");
	let value = obj;
	for (let i = 0; i < keys.length; i++) {
		if (value[keys[i]] === undefined) return undefined;
		value = value[keys[i]];
	}
	return value;
}

function _setValue(key: string, value: any, obj: Record<string, any>) {
	const keys = key.split(".");
	let current = obj;
	for (let i = 0; i < keys.length - 1; i++) {
		if (!(current[keys[i]] instanceof Object)) current[keys[i]] = {};
		current = current[keys[i]];
	}
	current[keys[keys.length - 1]] = value;
}

export function getVar(key: string): any {
	const json = _getJson();
	return _getValue(key, json);
}

export function setVar(key: string, value: any): void {
	const json = _getJson();
	_setValue(key, value, json);
	_setJson(json);
}
