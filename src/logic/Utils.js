function sleepRaw (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

export function sleep(time){
    return sleepRaw(time);
}