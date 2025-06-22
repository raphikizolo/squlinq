export interface ICommand
{
    args: any;
    name: string;
    execute(): void
    argsExecute?: (args: any[]) => void;
}