type AlertType = "success" | "error" | "warning" | "info";

class AlertService {
   
    private listeners : ((msg: string, type: AlertType )=> void)[] = [];

    subscribe(fn: (msg: string, type: AlertType)=> void){
        this.listeners.push(fn);
    }

    notify(message: string, type: AlertType){
        this.listeners.forEach((fn)=> fn(message, type));
    }

    success(msg: string){
        this.notify(msg,"success");
    }

    error(msg: string){
        this.notify(msg,"error")
    }

    warning(msg: string){
        this.notify(msg, "warning");
    }
    
    info(msg: string){
        this.notify(msg, "info");
    }
}

export const alertService = new AlertService();