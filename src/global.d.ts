interface ScrollPosition{
    x:  number;
    y:  number;
}

interface StateObject{
    uri:        string;
    timestamp:  number;
    scrollPos:  ScrollPosition;
    title?:     string;
    history?:   boolean;
}