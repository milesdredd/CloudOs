import exp from 'express';
const route = exp.Router();
import { NewTitle, addContent, addNotes, removeNote, getNotesList, getContent } from '../../controller/osNotes/osNotes.controller.js';
route.get('/', getNotesList);
route.post('/', addNotes);
route.post('/new', NewTitle);
route.get('/:id', getContent);
route.patch('/:id', addContent);
route.delete('/:id', removeNote);
// edit route ? 
// on edit comp with old data in frontend+BE if no change dont save ! 


export default route;