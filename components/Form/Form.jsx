import { useCallback, useRef } from 'react';

export default function Form({ 
    inputs, 
    action 
}){
    const form_ref = useRef(null);
    const submit_action = useCallback((event) => {
        event.preventDefault();
        const form_data = new FormData(form_ref?.current);
        action(event, Object.fromEntries(form_data));
    }, [form_ref, action]);

    return <form className="flex flex-col gap-10 justify-center items-center "
    ref={form_ref}>
        {inputs.map(({ name, type, place_holder }, index) => {
            return <input 
                    className='py-2 px-4 border-blue-500 border-2 rounded-lg text-black'
                    name={name} 
                    type={type} 
                    placeholder={place_holder} 
                    key={`form-input-${name}-${index}`} />
        })}
        <button 
        className="mx-auto font-bold py-2 px-4 rounded hover:text-white hover:bg-blue-500 hover:border-white border-2 border-black text-blue-500 bg-white"
        id="submit" 
        type="submit" 
        onClick={submit_action}>Submit</button>
    </form>
}