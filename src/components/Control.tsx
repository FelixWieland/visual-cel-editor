import React, { useCallback, useEffect, useState } from "react";
import { Control } from "rete";

export class CustomControl extends Control {
    constructor(emitter: any, ControlComponent: any, key: any, name: any) {
        super(key);

        const args = arguments;
        
        (this as any).render = "react";
        (this as any).component = ControlComponent;
        (this as any).props = {
            emitter,
            id: key,
            name,
            putData: () => this.putData.apply(this, args as any)
        };
    }
}
