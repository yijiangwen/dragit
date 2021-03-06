import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import items from './items'
import TreeView from '@material-ui/lab/TreeView';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { RxNode } from 'rx-drag/models/RxNode';
import { IToolboxItem } from '../../../rx-drag/models/IToolboxItem';
import TreeNode from './TreeNode';
import { cloneObject } from 'rx-drag/utils/cloneObject';
import {observer} from 'mobx-react';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      padding: theme.spacing(2),
      color:theme.palette.text.secondary,
    },
    treeItemLabel: {
      fontSize:'0.9rem',
      padding:theme.spacing(1,0),
    },

    title:{
      paddingLeft:theme.spacing(1),
    }
  }),
);


export const Toolbox = observer(()=>{
  const classes = useStyles();
  const [root, setRoot] = useState<RxNode<IToolboxItem>>();
  
  useEffect(()=>{
    let aRoot = new RxNode<IToolboxItem>();
    aRoot.parse(cloneObject(items));
    setRoot(aRoot);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        disableSelection
        style={{
          width: '100%',
        }}
      >
        {
          root?.children.map((node:RxNode<IToolboxItem>)=>{
            return (
              <TreeNode 
                key={node.id + ''} 
                node={node}
              />
            )
          })
        }
      </TreeView>      
   );
})