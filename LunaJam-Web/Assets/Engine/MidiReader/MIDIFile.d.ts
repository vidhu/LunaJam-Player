declare class MIDIFile {
	constructor(blob: any);
	getMidiEvents(): MIDIEvent[];
}

/**interface MIDIFile {
	(block: any): MIDIFile;
	getEvents(eventType:number): MIDIEvent[];
}
declare var MIDIFile: {
	new (blob: any): MIDIFile;
	(blob: any): MIDIFile;
}**/

interface MIDIEvent {
	channel: number
	delta: number
	index: string
	param1: number
	param2: number
	playTime: number
	subtype: number
	track: number
	type: number
}