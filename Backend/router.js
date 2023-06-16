// router.js

import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import bodyParser from 'body-parser';
import validator from 'validator';
import { Complaint, Log, FAQ } from './database.js';


const router                                            = express.Router();


const prefix                                            = 'CMP';
const min                                               = 1000;
const max                                               = 9999;

function generateUniqueId() {
  const randomNum                                       = Math.floor(Math.random() * (max - min + 1)) + min;
  return `${prefix}${randomNum}`;
}

// Body-parser middleware
router.use(bodyParser.urlencoded({ extended             : false }));
router.use(bodyParser.json());

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept only jpeg and png files
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload                                            = multer({ storage: storage, fileFilter: fileFilter });

// Define the endpoint for creating a complaint
router.post('/data', upload.single('image'), async (req, res) => {
  try {
    const { name, email, complainType, complain }       = req.body;

    const image                                         = req.file ? req.file.filename : '';
    const key                                           = generateUniqueId();

    // Validate the email field using the "validator" package
    if (!validator.isEmail(email)) {
      res.status(400).json({ message                    : 'Invalid email address.' });
      return;
    }

    const newComplaint = new Complaint({
        key,
        name,
        email,
        complainType,
        complain,
        image,
        createdAt                                       : new Date().toLocaleString(),
        });

        const savedComplaint                            = await newComplaint.save();
console.log('Complaint saved successfully:', savedComplaint);

// Return saved complaint with generated key
res.json({ data                                         : savedComplaint, uniqueKey: key });


} catch (error) {
    console.error(error);
    res.status(500).json({ message                      : 'An error occurred while saving the complaint data.' });
    }
    });
    
    // Define the endpoint for getting all complaints or searching by key
    router.get('/data', async (req, res) => {
    try {
    const { key }                                       = req.query;

    if (key) {
        // If a key is provided, search for complaints by key
        const complaints                                = await Complaint.find({ key: key });
        if (complaints.length > 0) {
          res.json(complaints);
        } else {
          res.status(404).json({ message                : 'No complaints found with the provided key.' });
        }
      } else {
        // If no key is provided, return all complaints
        const complaints                                = await Complaint.find();
        res.json(complaints);
      }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message                  : 'An error occurred while getting the complaints.' });
        }
        });
        
        // Define the endpoint for getting a single complaint
        router.get('/data/:key', async (req, res) => {
        try {
        const complaint                                 = await Complaint.findOne({ key: req.params.key });

        if (complaint) {
            res.json(complaint);
          } else {
            res.status(404).json({ message              : 'Complaint not found.' });
          }

          
        } catch (error) {
            console.error(error);
            res.status(400).json({ message              : 'Invalid complaint key.' });
            }
            });
            
            // Define the endpoint for updating a complaint
            router.put('/data/:key', upload.single('image'), async (req, res) => {
            try {
            const complaint                             = await Complaint.findOne({ key: req.params.key });
            if (!complaint) {
            res.status(404).json({ message              : 'Complaint not found.' });
            return;
            }
            complaint.name                              = req.body.name;
            complaint.email                             = req.body.email;
            complaint.complainType                      = req.body.complainType;
            complaint.complain                          = req.body.complain;
            if (req.file) {
            complaint.image                             = req.file.filename;
            }
            await complaint.save();
            console.log('Complaint updated successfully:', complaint);
            res.json(complaint);
            } catch (error) {
            console.error(error);
            res.status(400).json({ message              : 'Invalid complaint ID.' });
            }
            });
            
            // Define the endpoint for deleting a complaint
            router.delete('/data/:id', async (req, res) => {
            try {
            const complaint                             = await Complaint.findOne({ key: req.params.id });
            if (!complaint) {
            res.status(404).json({ message              : 'Complaint not found.' });
            return;
            }


            // Save the complaint to the log collection
                    const { note, checkbox, ...rest }   = req.body; // Retrieve note and checkbox values from the request body
                    const newLogData = {
                    ...complaint.toJSON(),
                    note,
                    checkbox,
                    ...rest,
                    };
                    const newLog                        = new Log(newLogData);
                    await newLog.save();

                    // Delete the complaint from the complaint collection
                    const result                        = await Complaint.findOneAndDelete({ key: req.params.id });
                    console.log('Result:', result);
                    if (!result) {
                    res.status(404).json({ message      : 'Complaint not found.' });
                    return;
                    }



                    console.log('Complaint deleted successfully:', result);
res.json({ message                                      : 'Complaint deleted successfully.' });


} catch (error) {
    console.error(error);
    res.status(400).json({ message                      : 'Invalid complaint ID.' });
    }
    });
    
    // Define the endpoint for getting all logs or searching by key
    router.get('/log', async (req, res) => {
    try {
    const { key }                                       = req.query;

    if (key) {
        // If a key is provided, search for logs by key
        const logs                                      = await Log.find({ key: key });
        if (logs.length > 0) {
          res.json(logs);
        } else {
          res.status(404).json({ message                : 'No logs found with the provided key.' });
        }
      } else {
        // If no key is provided, return all logs
        const logs                                      = await Log.find();
        res.json(logs);
      }
      

    } catch (error) {
        console.error(error);
        res.status(500).json({ message                  : 'An error occurred while getting the logs.' });
        }
        });
        
        // Define the endpoint for getting a single log
        router.get('/log/:key', async (req, res) => {
        try {
        const log                                       = await Log.findOne({ key: req.params.key });


        if (log) {
            res.json(log);
          } else {
            res.status(404).json({ message              : 'Log not found.' });
          }

        } catch (error) {
            console.error(error);
            res.status(400).json({ message              : 'Invalid log key.' });
            }
            });
            
            // Define the endpoint for deleting a log
            router.delete('/log/:id', async (req, res) => {
            try {
            const result                                = await Log.findOneAndDelete({ key: req.params.id });
            console.log('Result:', result);
            if (!result) {
            res.status(404).json({ message              : 'Log not found.' });
            return;
            }
            console.log('Log deleted successfully:', result);
            res.json({ message                          : 'Log deleted successfully.' });
            } catch (error) {
            console.error(error);
            res.status(400).json({ message              : 'Invalid log ID.' });
            }
            });
            

            ////////////////////////////////////////////////////////////////
            router.post('/api/log', async (req, res) => {
                try {
                  const { data, note, checkbox }        = req.body;
              
                  // Create a new log entry
                  const newLog = new Log({
                    key                                 : uuidv4(),
                    ...data,
                    note,
                    checkbox,
                  });
              
                  // Save the log entry to the database
                  await newLog.save();
              
                  res.status(201).json({ message        : 'Log created successfully' });
                } catch (error) {
                  console.error(error);
                  res.status(500).json({ message        : 'Failed to create log' });
                }
              });

           

              router.put('/api/log/:key', async (req, res) => {
                const { key }                           = req.params;
                const { checkbox }                      = req.body;
              
                try {
                  // Find the complaint in the database
                  const complaint                       = await Complaint.findOne({ key });
              
                  if (!complaint) {
                    return res.status(404).json({ error : 'Complaint not found' });
                  }
              
                  // Update the complaint's checkbox value
                  complaint.checkbox                    = checkbox;
              
                  // Save the updated complaint
                  await complaint.save();
              
                  res.json({ message                    : 'Complaint checkbox updated successfully' });
                } catch (error) {
                  console.error(error);
                  res.status(500).json({ error          : 'Server error' });
                }
              });

              // FAQ router
// Define the endpoint for getting all FAQ entries
router.get('/faq', async (req, res) => {
  try {
    const faqs                                          = await FAQ.find();
    res.json(faqs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message                      : 'An error occurred while getting the FAQ entries.' });
  }
});

// Define the endpoint for getting a single FAQ entry
router.get('/faq/:id', async (req, res) => {
  try {
    const faq                                           = await FAQ.findById(req.params.id);
    if (faq) {
      res.json(faq);
    } else {
      res.status(404).json({ message                    : 'FAQ entry not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message                      : 'Invalid FAQ entry ID.' });
  }
});

// Define the endpoint for creating an FAQ entry
router.post('/faq', async (req, res) => {
  try {
    const { question, answer }                          = req.body;

    // Create a new FAQ entry
    const newFAQ                                        = new FAQ({ question, answer });

    // Save the FAQ entry to the database
    await newFAQ.save();

    res.status(201).json({ message                      : 'FAQ entry created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message                      : 'Failed to create FAQ entry' });
  }
});

// Define the endpoint for updating an FAQ entry
router.put('/faq/:id', async (req, res) => {
  try {
    const { question, answer }                          = req.body;

    // Find the FAQ entry in the database
    const faq                                           = await FAQ.findById(req.params.id);

    if (!faq) {
      return res.status(404).json({ message             : 'FAQ entry not found' });
    }

    // Update the FAQ entry
    faq.question                                        = question;
    faq.answer                                          = answer;

    // Save the updated FAQ entry
    await faq.save();

    res.json({ message                                  : 'FAQ entry updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message                      : 'Failed to update FAQ entry' });
  }
});

// Define the endpoint for deleting an FAQ entry
router.delete('/faq/:id', async (req, res) => {
  try {
    const result                                        = await FAQ.findByIdAndDelete(req.params.id);
    if (!result) {
      res.status(404).json({ message                    : 'FAQ entry not found' });
      return;
    }
    res.json({ message                                  : 'FAQ entry deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message                      : 'Failed to delete FAQ entry' });
  }
});



              
          export default router;




